# Demo Frontend ReactJs + Api Php

## Api – PHP

Per il backend sono state utilizzate due librerie:

- [illuminate/database](https://github.com/illuminate/database) (libreria indipendente di Laravel)
- [bramus/router](https://github.com/bramus/router) (libreria indipendente)

## Interazione DB

Per l'interazione con il DB è stata utilizzata una libreria che con qualche riga di configurazione per la connessione mette a disposizione una sintassi potente, elegante e dinamica per l'interrogazione dei dati. Nella demo i dati sono relativi a vari prodotti.
A fronte di un modello rappresentato dalla classe in 'app/models/Products.php' in cui vengono specificati la tabella di riferimento e le proprietà utilizzabili è possibile, tramite il controller in 'app/controllers/Products.php' creare interrogazioni così come operazioni di scrittura/aggiornamento in maniera semplice ed intuitiva.
Ad esempio:

- \Models\Products::query()-\>get() restituirà tutti I record della tabella
- \Models\Products::query()-\>where("id", $id)-\>first() restituirà il solo record corrispondente

L'utilizzo di questo approccio è ancora più potente se si pensa alla dinamicità con cui è possibile chiamare dei metodi di interrogazione "virtuali".

Ad esempio se si volessero ottenere tutti i prodotti con prezzo maggiore di 100€ si potrebbe utilizzare un metodo dinamico che fa riferimento direttamente alla proprietà da interrogare:

- \Models\Products::query()-\>wherePrice("\>=", 100)-\>get()

Com'è possible vedere "wherePrice" non è realmente implementato ma attraverso la libreria viene correttamente interpretato come "where("price", "\>=", 100)" e questo è possibile per ogni proprietà del modello. È possibile inoltre concatenare più condizioni "where" per usare la logica "condizione1 AND condizione2" o "orWhere" per usare la logica "condizione1 OR condizione2". Il tutto verrà tradotto in comando sql ed inviato al db connesso (usando l'interpolazione che evita problemi come una sql injection)

## Routing

Per esporre l'api è stata utilizzata una libreria che permette di dichiarare in maniera chiara quali sono le rotte e come risponderanno.
Ad esempio:

- $router-\>match('GET', '/api/products/{id}', function (int $id) { … }) espone "/api/products/{id}"
  e restituisce il prodotto richiesto tramite la specifica del suo id
- $router-\>match('GET', '/api/products', function () { … }) espone "/api/products/"
  e restituisce la lista dei prodotti

È possibile specificare delle regular expression per creare rotte più complesse che associate all'utilizzo di parentesi graffe (come nell'esempio {id}) permettono la cattura di argomenti per il loro utilizzo

## Frontend – ReactJs

Per il frontend sono state utilizzate, oltre a [ReactJs](https://legacy.reactjs.org/) le seguenti librerie:

- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [lodash](https://lodash.com/)
- [axios](https://axios-http.com/)

Guardando il codice in "frontend/src/App.js" è possibile vedere come tutta l'interfaccia sia descritta con una sintassi JSX, simile alla scrittura dei semplici tag html, e vengano dichiarate tutte le interazioni direttamente all'interno del componente. Infatti react utilizza la programmazione dichiarativa per creare componenti che reagiscano agli stati a cui vengono associati.
Ad esempio la parte
```js
{productList.map(el => <tr key={el.id}>
    <td>{el.id}</td>
    <td>{el.brand}</td>
    <td>{el.title}</td>
    <td>{el.price} €</td>
    <td><Badge bg="secondary">{el.rating.toFixed(2)}</Badge></td>
</tr>)}
```
dichiara che per ogni prodotto deve essere mostrata una riga della tabella con le proprietà del prodotto. Se la lista prodotti dovesse cambiare anche la sua visualizzazione cambierà senza nessun controllo "attivo" da parte del codice scritto dallo sviluppatore.

Altre librerie usate sono axios per la comunicazione facilitata con l'api e lodash che contiene un insieme di utility per la gestione di array e oggetti.

L'uso di react così come altre librerie di utility rendono lo sviluppo più semplice e veloce oltre a permettere approcci più organizzati e semplici da manutenere
