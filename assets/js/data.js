//======================= Start Data of Items Card =======================

let product = [
  {
    id: 1,
    ProductCtegory: "property",
    productImage: "assets/imgs/Card_Images/house.jpg",
    productSubCat: "house",
    productLocation: "new cairo",
    productStar: ``,
    productRate: "5.0",
    productDescription:
      "This charming three-bedroom, two-bathroom house is located in a desirab...",
    productPrice: "120",
  },
  {
    id: 2,
    ProductCtegory: "transportation",
    productImage: "assets/imgs/Card_Images/Car.jpg",
    productSubCat: "car",
    productLocation: "giza",
    productStar: ``,
    productRate: "4.5",
    productDescription:
      "This spacious BMW is perfect for long drives and local errands.",
    productPrice: "230",
  },
  {
    id: 3,
    ProductCtegory: "play-areas",
    productImage: "assets/imgs/Card_Images/Playground.jpg",
    productSubCat: "playgrounds",
    productLocation: "alexandria",
    productStar: ``,
    productRate: "4.5",
    productDescription:
      "This safe, inviting playground is the perfect spot for kids to get outdoors an...",
    productPrice: "50",
  },
  {
    id: 4,
    ProductCtegory: "electronics",
    productImage: "assets/imgs/Card_Images/Camera.jpg",
    productSubCat: "canon camera",
    productLocation: "cairo",
    productStar: ``,
    productRate: "4.5",
    productDescription:
      "It features a 24.2 megapixel CMOS sensor, a 3.2 inch LCD monitor, a DIGIC...",
    productPrice: "60",
  },
];

localStorage.setItem("products", JSON.stringify(product));

//======================= End Data of Items Card =======================

//======================= Start Data of Items Reviews =======================

let itemsReview = [
  {
    id: 1,
    image: "./assets/imgs/Person/Khaled-Atef.jfif",
    name: "Khaled Atef",
    ratingNumber: "5.0",
    ratingClass: "",
    itemStar: ``,
    comment: "This house was everything we wanted in a rental property!",
    loveNumber: "0",
    daysNumber: "0",
  },
  {
    id: 2,
    image: "./assets/imgs/Person/Samy-Wael.jfif",
    name: "Samy Wael",
    ratingNumber: "4.0",
    ratingClass: "",
    itemStar: ``,
    comment: "My colleagues and I rented this house for a business trip.",
    loveNumber: "10",
    daysNumber: "30",
  },
  {
    id: 3,
    image: "./assets/imgs/Person/Kamel-Medhat.jfif",
    name: "Kamel Medhat",
    ratingNumber: "3.0",
    ratingClass: "",
    itemStar: ``,
    comment: "We had a wonderful experience renting this house.",
    loveNumber: "21",
    daysNumber: "5",
  },
];

//======================= Start Data of Items Reviews =======================
