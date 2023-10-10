import 'bootstrap/dist/css/bootstrap.min.css';
import {Badge, Button, Container, Form, InputGroup, Table} from "react-bootstrap";
import useAxios from "axios-hooks";
import {useEffect, useState} from "react";
import {range} from "lodash";

const App = ({brandFilter, onFilterChange, clearFilter, titleFilter, priceFilter, maxPrice, ratingFilter, productList, totalPages, setPage, page}) => <Container>
    <Table striped>
        <thead>
        <tr>
            <th style={{width: "4%"}}>#</th>
            <th style={{width: "24%"}}>
                <InputGroup size="sm">
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder="Brand"
                        value={brandFilter}
                        onChange={onFilterChange("brandFilter")}
                    />
                    <Button onClick={clearFilter("brandFilter")} variant="outline-secondary" id="button-addon1">
                        X
                    </Button>
                </InputGroup>
            </th>
            <th style={{width: "24%"}}>
                <InputGroup size="sm">
                    <Form.Control
                        aria-label="Example text with button addon"
                        aria-describedby="basic-addon1"
                        placeholder="Brand"
                        value={titleFilter}
                        onChange={onFilterChange("titleFilter")}
                    />
                    <Button onClick={clearFilter("titleFilter")} variant="outline-secondary" id="button-addon1">
                        X
                    </Button>
                </InputGroup>
            </th>
            <th style={{width: "24%"}}>
                <Form.Label>Price</Form.Label>
                <Form.Range onChange={onFilterChange("priceFilter")} value={priceFilter} min={-1} max={maxPrice} step={10}/>
            </th>
            <th style={{width: "24%"}}>
                <Form.Label> ({ratingFilter >= 0 ? parseFloat(ratingFilter).toFixed(2) : '0.00'}) Rating</Form.Label>
                <Form.Range onChange={onFilterChange("ratingFilter")} value={ratingFilter} min={-.1} max={4.9} step={.1}/>
            </th>
        </tr>
        </thead>
        <tbody>
        {productList.map(el => <tr key={el.id}>
            <td>{el.id}</td>
            <td>{el.brand}</td>
            <td>{el.title}</td>
            <td>{el.price} €</td>
            <td><Badge bg="secondary">{el.rating.toFixed(2)}</Badge></td>
        </tr>)}
        </tbody>
        <tfoot>
        <tr>
            <th colSpan={3}>{range(0, totalPages, 1).map(el => <Button
                style={{
                    marginLeft: 10
                }}
                key={el}
                onClick={() => setPage(el)}
                disabled={el === page}
            >{el + 1}</Button>)}</th>
        </tr>
        </tfoot>
    </Table>
</Container>;


const AppContainer = () => {
    // caricamento dati da backend/api
    const [{data: products = []}] = useAxios("/api/products")

    const [page, setPage] = useState(0); //state per la pagina
    const [maxPrice, setMaxPrice] = useState(0); // state per il filtro del prezzo

    // state per i filtri
    const [filters, setFilter] = useState({brandFilter: "", titleFilter: "", priceFilter: -1, ratingFilter: -1})
    const {brandFilter, titleFilter, priceFilter, ratingFilter} = filters;

    // applicazione dei filtri
    const filteredProducts = products.filter(el => {
        if (ratingFilter >= 0) {
            return el.rating >= ratingFilter
        }
        return true
    }).filter(el => {
        if (priceFilter >= 0) {
            return el.price >= priceFilter
        }

        return true;
    }).filter(el => {
        if (brandFilter !== "") {
            return el.brand.toLowerCase().includes(brandFilter.toLowerCase())
        }

        return true;
    }).filter(el => {
        if (titleFilter !== "") {
            return el.title.toLowerCase().includes(titleFilter.toLowerCase())
        }

        return true;
    })

    const pagedProducts = filteredProducts.slice(page * 10, (page + 1) * 10);

    // reset pagina al cambio filtro
    useEffect(() => {
        setPage(0)
    }, [filters])

    // calcolo del prezzo massimo al cambio lista
    useEffect(() => {
        const maxPriceToSet = products.reduce((maxPriceFound, el) => {
            return el.price > maxPriceFound ? el.price : maxPriceFound;
        }, 0);
        setMaxPrice(maxPriceToSet)
    }, [products])

    const onFilterChange = filterName => event => setFilter(f => ({...f, [filterName]: event.target.value}));
    const clearFilter = filterName => () => setFilter(f => ({...f, [filterName]: ""}));

    return <App
        brandFilter={brandFilter}
        page={page}
        priceFilter={priceFilter}
        productList={pagedProducts}
        totalPages={Math.ceil(filteredProducts.length / 10)}
        clearFilter={clearFilter}
        maxPrice={maxPrice}
        onFilterChange={onFilterChange}
        ratingFilter={ratingFilter}
        setPage={setPage}
        titleFilter={titleFilter}
    />
}


export default AppContainer;
