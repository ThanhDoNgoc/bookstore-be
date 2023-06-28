import DatabaseConnection from "../database/db.connect";
import Book from "../components/book/models/book-model";

const books = [
  {
    title: "To Kill a Mockingbird",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 10,
    price: 19.99,
    description:
      "Harper Lee's Pulitzer Prize-winning novel about racial injustice in the Deep South.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "1984",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 5,
    price: 12.99,
    description:
      "George Orwell's dystopian classic depicting a totalitarian society.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "Pride and Prejudice",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 3,
    price: 14.99,
    description:
      "Jane Austen's beloved novel exploring love, class, and societal expectations.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "The Great Gatsby",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 8,
    price: 9.99,
    description:
      "F. Scott Fitzgerald's iconic tale of wealth, love, and the American Dream.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "To the Lighthouse",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 2,
    price: 17.99,
    description:
      "Virginia Woolf's experimental novel exploring themes of time, art, and perception.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "Moby-Dick",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 15,
    price: 22.99,
    description:
      "Herman Melville's epic tale of Captain Ahab's obsession with a great white whale.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "Jane Eyre",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 6,
    price: 11.99,
    description:
      "Charlotte Brontë's classic novel of love, independence, and personal growth.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "The Catcher in the Rye",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 4,
    price: 13.99,
    description:
      "J.D. Salinger's coming-of-age novel that has become a modern classic.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "The Lord of the Rings",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 12,
    price: 29.99,
    description:
      "J.R.R. Tolkien's epic fantasy trilogy set in the world of Middle-earth.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "Frankenstein",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 7,
    price: 16.99,
    description:
      "Mary Shelley's influential novel about science, creation, and the nature of humanity.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "Brave New World",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 9,
    price: 18.99,
    description:
      "Aldous Huxley's dystopian vision of a futuristic society governed by technology and conformity.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "The Odyssey",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 1,
    price: 24.99,
    description:
      "Homer's epic poem following the adventures of Odysseus on his journey home.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "The Picture of Dorian Gray",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 11,
    price: 15.99,
    description:
      "Oscar Wilde's novel about a man who remains forever young while his portrait ages.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "The Adventures of Huckleberry Finn",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 3,
    price: 10.99,
    description:
      "Mark Twain's classic tale of adventure and friendship along the Mississippi River.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "Wuthering Heights",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 7,
    price: 12.99,
    description:
      "Emily Brontë's haunting and passionate story of love and revenge on the Yorkshire moors.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "The Hobbit",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 10,
    price: 21.99,
    description:
      "J.R.R. Tolkien's beloved adventure of Bilbo Baggins and his quest for treasure.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "Crime and Punishment",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 4,
    price: 14.99,
    description:
      "Fyodor Dostoevsky's psychological novel about guilt, redemption, and moral dilemmas.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "Alice's Adventures in Wonderland",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 8,
    price: 11.99,
    description:
      "Lewis Carroll's whimsical tale of a girl's adventures in a fantastical world.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "The Scarlet Letter",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 6,
    price: 13.99,
    description:
      "Nathaniel Hawthorne's novel exploring sin, guilt, and redemption in Puritan New England.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "The Count of Monte Cristo",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 3,
    price: 17.99,
    description:
      "Alexandre Dumas' gripping tale of betrayal, revenge, and justice.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "The Adventures of Sherlock Holmes",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 9,
    price: 16.99,
    description:
      "Sir Arthur Conan Doyle's collection of detective stories featuring the iconic Sherlock Holmes.",
    category: "sport",
    isDeleted: false,
  },
  {
    title: "Sense and Sensibility",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 5,
    price: 12.99,
    description:
      "Jane Austen's tale of two sisters navigating love, societal expectations, and personal growth.",
    category: "comedy",
    isDeleted: false,
  },
  {
    title: "The Iliad",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 2,
    price: 23.99,
    description:
      "Homer's epic poem recounting the Trojan War and the heroism of Achilles.",
    category: "drama",
    isDeleted: false,
  },
  {
    title: "The Adventures of Tom Sawyer",
    image:
      "https://binhbanbook.com/wp-content/uploads/2023/02/z4136274435886_08837faf1d243f3808ed7dc6339e7713.jpg",
    quantity: 7,
    price: 10.99,
    description:
      "Mark Twain's classic novel about a mischievous boy and his adventures in a small town.",
    category: "sport",
    isDeleted: false,
  },
];

async function dumbData() {
  try {
    const dbConnection: DatabaseConnection = DatabaseConnection.getInstance();
    dbConnection.connect();
    Book.insertMany(books).then((result) => {
      console.log("dumb success");
    });
  } catch (error) {
    console.log("dumb fail: ", error);
  }
}

dumbData()
process.exit()