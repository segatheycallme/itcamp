// exercises.ts

// 1. Basic Types
// Define variables for a user's name (string), age (number), and isAdmin (boolean).
// Write a function that takes a number and returns its square.
let age: number = 16;
let user: string = "ja";
let isAdmin: boolean = false;
function sq(num: number): number {
  return num * num;
}

// 2. Arrays and Tuples
// Create an array of favorite colors (string[]).
// Define a tuple to store the x and y coordinates of a point.
// Write a function to calculate the distance of a point from the origin.
let favColors: string[] = ["red", "green", "blue"];
let coords: [number, number] = [1.0, 3.0];
function distance_from_origin(point: [number, number]): number {
  return Math.sqrt(point[0] * point[0] + point[1] * point[1]);
}

// 3. Enums
// Create an enum for the days of the week.
// Write a function that takes a day and returns whether it is a weekday or a weekend.
enum dayOfTheWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

function isWeekend(day: dayOfTheWeek): boolean {
  if (day === dayOfTheWeek.Saturday || day === dayOfTheWeek.Sunday) {
    return true;
  }
  return false;
}

// 4. Functions
// Write a function `greet` that takes a name (required) and a greeting (optional, default to "Hello").
function greet(name: string, greeting: string = "Hello"): string {
  return greeting + ", " + name + "."
}

// 5. Interfaces
// Create an interface `User` with fields: name, email, and age.
// Write a function that takes a User object and returns a formatted string like "Name (Age) - Email".
interface User {
  name: string,
  email: string,
  age: number
}
function formatUser(user: User): string {
  return `${user.name} (${user.age}) - ${user.email}`
}

// 6. Type Aliases
// Define a type alias `Product` with fields: name, price, and an optional category.
// Write a function to filter an array of Product by a given category.
type Product = {
  name: string,
  price: number,
  category?: "fast food" | "drinks" | "shoes",
}

function filterCategory(productArr: Product[], category: "fast food" | "drinks" | "shoes"): Product[] {
  return productArr.filter((el) => el.category === category)
}

// 7. Union and Intersection Types
// Write a function that takes a parameter of type `string | number` and performs different operations based on its type.
// Create two interfaces `Admin` and `Customer`, then define a type `UserRole` as their intersection.
function funkcija(val: string | number) {
  if (typeof val === "string") {
    return val + val;
  }
  return val * 2;
}

// 8. Generics (Bonus)
// Write a generic function `identity` that takes a value and returns it.
// Create a generic Stack class with methods push, pop, and peek.
function identity<T>(value: T) {
  return value;
}

class Stack<T> {
  constructor() {
    this.arr = []
  }
  private arr: T[]

  public push(value: T) {
    this.arr.push(value);
  }
  public pop(): T | undefined {
    return this.arr.pop();
  }
  public peek(): T {
    return this.arr[this.arr.length - 1];
  }
}
