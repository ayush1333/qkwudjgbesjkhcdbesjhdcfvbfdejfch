class Book {
  constructor(name, author, type, publishdate) {
    this.name = name;
    this.author = author;
    this.type = type;
    this.publishdate = publishdate;
  }
}

const booksData = [];
class Display {
  generateRandomBookName() {
    const bookNames = [
      'The Catcher in the Rye',
      'To Kill a Mockingbird',
      '1984',
      'The Great Gatsby',
      'Pride and Prejudice',
      'Moby Dick',
      'The Lord of the Rings',
      'Jane Eyre',
      'The Odyssey',
      "Harry Potter and the Sorcerer's Stone",
      'Brave New World',
      'The Chronicles of Narnia',
      'The Hobbit',
      'The Kite Runner',
      'Gone with the Wind',
      'Animal Farm',
      'The Alchemist',
      'The Da Vinci Code',
      'The Fault in Our Stars',
      'The Hunger Games',
      'A Tale of Two Cities',
      'The Shining',
      'The Grapes of Wrath',
      'The Picture of Dorian Gray',
      'The Adventures of Tom Sawyer',
      'The Scarlet Letter',
      'The Count of Monte Cristo',
      'Fahrenheit 451',
      'The Outsiders',
      'One Hundred Years of Solitude',
      'The Little Prince',
      'The Hobbit',
      'Catch-22',
      'Lord of the Flies',
      'War and Peace',
      'Crime and Punishment',
      'The Divine Comedy',
      "The Handmaid's Tale",
      'The Book Thief',
      'The Adventures of Huckleberry Finn',
      'The Giver',
      'East of Eden',
      'The Color Purple',
      'The Sun Also Rises',
      'The Secret Garden',
      'Wuthering Heights',
      'Slaughterhouse-Five',
      'The Old Man and the Sea',
      'Frankenstein',
    ];

    const randomIndex = Math.floor(Math.random() * bookNames.length);
    return bookNames[randomIndex];
  }

  getRandomAuthorName() {
    const authorNames = [
      'John Smith',
      'Emily Johnson',
      'David Wilson',
      'Sarah Davis',
      'Michael Brown',
      'Olivia Martinez',
      'Robert Anderson',
      'Emma Thomas',
      'Daniel Taylor',
      'Sophia Hernandez',
      'Matthew Moore',
      'Isabella Garcia',
      'William Clark',
      'Ava Lewis',
      'Joseph Rodriguez',
      'Mia Lee',
      'James Walker',
      'Abigail Hall',
      'Benjamin Young',
      'Charlotte Allen',
      'Andrew Turner',
      'Harper Hill',
      'Alexander Scott',
      'Elizabeth Green',
      'Nicholas Baker',
      'Ella Adams',
      'Christopher King',
      'Grace Mitchell',
      'Joshua Carter',
      'Sofia Hall',
      'Anthony Murphy',
      'Avery Morris',
      'David Cook',
      'Scarlett Turner',
      'Tyler Wright',
      'Lily Garcia',
      'Jackson Thompson',
      'Chloe Walker',
      'Samuel White',
      'Victoria Lopez',
      'Elijah Martin',
      'Madison Gonzalez',
      'Gabriel Hill',
      'Addison Roberts',
      'Nathan Murphy',
      'Evelyn Hall',
      'Ryan Butler',
      'Grace Phillips',
      'Christian Ramirez',
      'Natalie Campbell',
      'Dylan Young',
      'Brooklyn Anderson',
    ];
    const randomIndex = Math.floor(Math.random() * authorNames.length);
    return authorNames[randomIndex];
  }

  generateRandomSubject() {
    const subjects = [
      'Maths',
      'Physics',
      'Chemistry',
      'Biology',
      'History',
      'Geography',
    ];
    const randomIndex = Math.floor(Math.random() * subjects.length);
    return subjects[randomIndex];
  }

  generateRandomBook(index) {
    console.log(index);
    const randomName = this.generateRandomBookName();
    const randomAuthor = this.getRandomAuthorName();
    const randomSubject = this.generateRandomSubject();
    const randomPublishDate = this.generateRandomDate();
    return new Book(randomName, randomAuthor, randomSubject, randomPublishDate);
  }

  generateRandomDate() {
    const start = new Date('2022-01-01').getTime();
    const end = new Date('2022-12-31').getTime();
    const randomTimestamp = Math.random() * (end - start) + start;
    const randomDate = new Date(randomTimestamp);
    return randomDate.toISOString().split('T')[0];
  }

  generateTable() {
    console.log(booksData);

    console.log("'test1");
    const tableBody = document.getElementById('tableBody');
    const paginationContainer = document.getElementById('pagination');

    const perPage = 10;
    const totalPages = Math.ceil(booksData.length / perPage);

    let currentPage = 1;
    let startIndex = (currentPage - 1) * perPage;
    let endIndex = startIndex + perPage;
    let slicedData = booksData.slice(startIndex, endIndex);

    console.log('test2');
    let uistring = '';

    slicedData.forEach((book, index) => {
      console.log('test3');
      uistring += `<tr>
      <th scope="row">${index + 1}</th>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.type}</td>
      <td>${book.publishdate}</td>
      </tr>`;
    });
    console.log('test4');

    tableBody.innerHTML = uistring;

    let paginationHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      paginationHTML += `<span class="pagination-link ${
        i === currentPage ? 'active' : ''
      }" data-page="${i}">${i}</span>`;
    }

    paginationContainer.innerHTML = paginationHTML;

    const paginationLinks =
      paginationContainer.getElementsByClassName('pagination-link');
    Array.from(paginationLinks).forEach((link) => {
      link.addEventListener('click', () => {
        currentPage = parseInt(link.getAttribute('data-page'));
        startIndex = (currentPage - 1) * perPage;
        endIndex = startIndex + perPage;
        slicedData = booksData.slice(startIndex, endIndex);

        let updatedTableHTML = '';

        slicedData.forEach((book, index) => {
          updatedTableHTML += `
          <tr>
            <th scope="row">${startIndex + index + 1}</th>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.type}</td>
            <td>${book.publishdate}</td>
          </tr>
        `;
        });

        tableBody.innerHTML = updatedTableHTML;

        Array.from(paginationLinks).forEach((paginationLink) => {
          paginationLink.classList.remove('active');
        });
        link.classList.add('active');
      });
    });

    console.log('test5');
  }

  clear() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById('message');
    let boldText;
    if (type === 'success') {
      boldText = 'Success';
    } else {
      boldText = 'Error!';
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
    setTimeout(function () {
      message.innerHTML = '';
    }, 5000);
  }
}

let display = new Display();

window.onload = function () {
  display.generateTable();
};

for (let i = 4; i <= 200; i++) {
  const randomBook = display.generateRandomBook(i);
  booksData.push(randomBook);
}

// let libraryForm = document.getElementById('libraryForm');
// libraryForm.addEventListener('submit', libraryFormSubmit);

// function libraryFormSubmit(e) {
//   console.log('You have submitted library form');
//   let name = document.getElementById('bookName').value;
//   let author = document.getElementById('author').value;
//   let publishDate = document.getElementById('publishDate').value;

//   let type;
//   let maths = document.getElementById('maths');
//   let programming = document.getElementById('programming');
//   let physics = document.getElementById('physics');
//   let chemistry = document.getElementById('chemistry');
//   let biology = document.getElementById('biology');
//   let history = document.getElementById('history');

//   if (maths.checked) {
//     type = maths.value;
//   } else if (programming.checked) {
//     type = programming.value;
//   } else if (physics.checked) {
//     type = physics.value;
//   } else if (chemistry.checked) {
//     type = chemistry.value;
//   } else if (biology.checked) {
//     type = biology.value;
//   } else if (history.value) {
//     type = history.value;
//   }

//   let book = new Book(name, author, type, publishDate);
//   console.log(book);

//   if (display.validate(book)) {
//     display.add(book);
//     display.generateTable();
//     display.clear();
//     display.show('success', 'Your book has been successfully added');
//   } else {
//     // Show error to the user
//     display.show('danger', 'Sorry you cannot add this book');
//   }

//   e.preventDefault();
// }

function handleInputChange() {
  let searchInput = document.getElementById('searchInput');
  let inputValue = searchInput.value.toLowerCase();

  // Perform actions with the input value
  console.log('Input value:', inputValue);
  let filteredBooks = booksData.filter((book) => {
    let title = book.name.toLowerCase();
    let author = book.author.toLowerCase();
    let subject = book.type.toLowerCase();
    let publishDate = book.publishdate.toLowerCase();

    return (
      title.includes(inputValue) ||
      author.includes(inputValue) ||
      subject.includes(inputValue) ||
      publishDate.includes(inputValue)
    );
  });
  console.log('test60');
  // Add your logic here based on the input value

  displayFilteredBooks(filteredBooks);
  searchInput.value = '';
  console.log('wgdwudgwgdwshgdwusdgudyg');
}

function displayFilteredBooks(filteredBooks) {
  let resultsBody = document.getElementById('resultsBody');
  resultsBody.innerHTML = ''; // Clear the existing table body content

  // Loop through the filtered books and generate table rows
  filteredBooks.forEach((book) => {
    let row = `<tr>
      <td>${book.name}</td>
      <td>${book.author}</td>
      <td>${book.type}</td>
      <td>${book.publishdate}</td>
    </tr>`;
    resultsBody.innerHTML += row;
  });

  // Show the modal with the filtered results
  $('#resultsModal').modal('show');
}

// `${index} -${book.name} - ${book.author} - ${book.type} - ${book.publishdate}`
