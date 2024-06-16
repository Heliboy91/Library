let myLibrary = [];
//the "add" button in top left corner
const callForm = document.querySelector("#add");
//the "sort" button
const sortButton = document.querySelector("#sort");
//the sorting option div
const sortOptions = document.querySelector(".options");
//show all button
const all = document.querySelector("#all");
//the form
const form = document.querySelector(".Form");
//form close button
const closeButton = document.querySelector("#close");
//form submit button
const createObject = document.querySelector("#createObject");
//container for books
const container = document.querySelector("#container");
//keeps track of the length of myLibrary and assign id to new elements in the library
//html element we refresh in h2 title
const numDiv = document.querySelector("#number");
let libraryLength = myLibrary.length;

//function to sort array by author
function sortAuthors() {
    const showAuthors = myLibrary.map((book) => {
        return book.author;
    });
    const sortedAuthors = showAuthors.sort(); 

    const div = document.createElement("div");
    div.classList.add("subdiv");

    const h2= document.createElement("h2");
    h2.textContent = "Authors in this library"

    div.appendChild(h2);
    for(i=0; i < sortedAuthors.length; i++) {
        let p = document.createElement("p");
        p.textContent = sortedAuthors[i];
        div.appendChild(p);
    }

    container.appendChild(div);

}

function sortTitles(){
    const showTitles = myLibrary.map((book) => {
        return book.title;
    });
    const sortedTitles = showTitles.sort(); 

    const div = document.createElement("div");
    div.classList.add("subdiv");

    const h2= document.createElement("h2");
    h2.textContent = "Titles in this library"

    div.appendChild(h2);
    for(i=0; i < sortedTitles.length; i++) {
        let p = document.createElement("p");
        p.textContent = sortedTitles[i];
        div.appendChild(p);
    }

    container.appendChild(div);


}

//function to select all book with read=yes status
function selectRead () {
    const readYes = myLibrary.filter((book)=> book.read == "yes");
    const readNo = myLibrary.filter((book)=> book.read == "no");
    console.log("Librarylength: " + myLibrary.length);
    console.log("You read: " + readYes.length);
    const subdivLeft = document.createElement("div");
    subdivLeft.classList.add("subdiv");
    
    const subdivRight = document.createElement("div");
    subdivRight.classList.add("subdiv");
    subdivLeft
    
    
    const h2Left = document.createElement("h2");
    h2Left.textContent = "You read the following books";
    
    const h2Right = document.createElement("h2");
    h2Right.textContent = "You haven't read the following books";
    
    subdivLeft.appendChild(h2Left);
    subdivRight.appendChild(h2Right);
   
    for (i=0; i < readYes.length; i++) {
        let book = document.createElement("p");
        book.textContent = `${readYes[i].title} by ${readYes[i].author}`;
        subdivLeft.appendChild(book);
    }

    for (i=0; i < readNo.length; i++) {
        let book = document.createElement("p");
        book.textContent = `${readNo[i].title} by ${readNo[i].author}`;
        subdivRight.appendChild(book);
    }

    container.appendChild(subdivLeft);
    container.appendChild(subdivRight);


}

function showLibrary () {
    
    container.innerHTML ="";
    for(i=0; i < myLibrary.length; i++) {
         //dinamic html creation on demand for each book
         const bookDiv= document.createElement("div");
         const bookTitle = document.createElement("h2");
         const bookDetails = document.createElement("p");
         const remove = document.createElement("button");
         const readStatus = document.createElement("div");
         const showRead = document.createElement("input");
         const label = document.createElement("label");
         const index = i;
         readStatus.style.display = "flex";
         readStatus.style.gap = "8px";
         readStatus.style.marginTop = "20px";
 
         
         label.style.fontSize = "0.8rem";
         label.textContent ="Read";
 
         showRead.setAttribute("type", "checkbox");
         showRead.style.accentColor = "green";
         showRead.style.outline = "none";
         switch(myLibrary[i].read) {
                 case "no":
                     showRead.checked = false;
                     break;
                 case "yes":
                     showRead.checked = true;
                     break;
         }
 
         bookDetails.style.textAlign = "center";
         bookDetails.style.lineHeight = "30px";
         bookDetails.innerHTML = "Author: " + myLibrary[i].author + "<br/>" + "Pages: " + myLibrary[i].pages + "<br/>" + "ID: " + myLibrary[i].id; 
         
         bookTitle.textContent = myLibrary[i].title;
 
         remove.classList.add("removeButton");
         remove.textContent = "Remove";

        //remove element when pressing "Remove"
        remove.addEventListener("click", (e)=>{
            bookDiv.style.display = "none";
            myLibrary.splice(index,1);
            libraryLength-=1;
            numDiv.textContent = libraryLength;
        });
 
         //populate div
         bookDiv.classList.add("book");
         bookDiv.appendChild(bookTitle);
         bookDiv.appendChild(bookDetails);
         bookDiv.appendChild(remove);
         readStatus.appendChild(label);
         readStatus.appendChild(showRead);
         bookDiv.appendChild(readStatus);
         container.appendChild(bookDiv); 

        
 
 
    }
 }

//display Form
callForm.onclick = function () {
    form.style.display = "flex";
}

//close Form
closeButton.onclick = function (){
    form.style.display = "none";
}

//display options for sorting
sortButton.onclick = function () {
    sortOptions.style.display = "flex";
}





//close the sorting option menu on choosing and arranging books
const radioDivs = document.querySelectorAll('.radioDiv');
for(i=0; i < radioDivs.length; i++) {
    radioDivs[i].addEventListener("click", (e) => {
        const radioButtons = document.querySelectorAll("input[type = 'radio']");
        let sortBy;
        for(i=0; i < radioButtons.length; i++) {
            if(radioButtons[i].checked === true) {
                sortBy = radioButtons[i].value;
            }
        }
        console.log("Sortby: " + sortBy);
        sortOptions.style.display = "none";
        

        //NEED A FUNCTION HERE TO SORT ACCORDING TO RADIO CHOICE
        //empty the container div before showing result
        container.innerHTML = "";
        switch(sortBy){
            case "title":
                sortTitles();
                break;
            case "author":
                sortAuthors();
                break;
            case "readStatus":
                selectRead();
                break;
        }
        
        

    })
}


/*

//creating a Book object
function Book(author,title,pages,read) {
// the constructor...
this.author = author;
this.title = title;
this.pages = pages;
this.id = libraryLength;
this.read = read;
}

*/

class Book{
    constructor(author,title,pages,read){
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.id = libraryLength;
        this.read = read;
    }
}


//Add book to array
function addBookToLibrary() {

    let author = document.querySelector("#author");
    let title = document.querySelector("#title");
    let pages = document.querySelector("#pages");
    let checked =(document.querySelector("#readIt").checked == true)? "yes": "no";
    let book = new Book(author.value,title.value,pages.value,checked);
    myLibrary.push(book);
    //increment librarylength so the next book has a different id
    libraryLength +=1;

    //after creating the object, we set the inputs empty again
    author.value="";
    title.value="";
    pages.value="";
    document.querySelector("#readIt").checked = false;

    



}


//trigger formbutton
createObject.addEventListener("click", (e)=> {
    addBookToLibrary();
    //create animation as feedback when adding a book
    let animationdiv = document.createElement("div");
    animationdiv.textContent = "------------------";
   
    animationdiv.classList.add("feedback");
    form.appendChild(animationdiv);
    numDiv.textContent = libraryLength; 
    }
);

//show all books
all.onclick = function (){
    showLibrary();
}



