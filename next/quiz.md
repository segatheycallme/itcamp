# Node.js and Next.js Quiz

Sergej Knezevic

## 1. In a typical Node.js REST API project structure, which folder typically contains the database connection logic?

- `/routes`
- **`/controllers`**
- `/config`
- `/middleware`

/controllers

---

## 2. Explain the purpose of middleware in Express.js and provide an example of a common middleware function

Middleware in express.js is a function that runs before the main function
that returns the response with the same arguments.
A common middleware function would be a logging
function that prints out the headers and or body of the request.

---

## 3. What's wrong with this API endpoint implementation and how would you fix it?

```javascript
app.get("/api/users/:id", (req, res) => {
  const userId = re.params.id;
  const user = database.user.findUnique(userId);
  res.json(user);
});
```

---

## 4. Complete the Prisma schema to define a many-to-many relationship between Students and Courses

```prisma
model Student {
  id Int @id @default(autoincrement())
  name String
  email String @unique
  courses Course[] @relation("StudentCourse")
}

model Course {
  id Int @id @default(autoincrement())
  title String
  students Students[] @relation("StudentCourse")
}
```

---

## 5. Which command generates the Prisma client after schema changes?

- `npx prisma generate (dev)`
- **`npx prisma migrate`**
- `npx prisma client`
- `npx prisma build`

`npx prisma migrate`

---

## 6. In Prisma, which of the following is the correct way to query for a record by ID with included relations?

- A: `prisma.user.findOne({ where: { id: 1 }, include: { posts: true } })`
- **B: `prisma.user.findUnique({ where: { id: 1 }, include: { posts: true } })`**
- C: `prisma.user.findById(1, { include: { posts: true } })`
- D: `prisma.user.get({ id: 1, include: { posts: true } })`

B: `prisma.user.findUnique({ where: { id: 1 }, include: { posts: true } })`

---

## 7. Write a SQL query to find all courses with more than 5 enrolled students, showing the course title and the count of students

```sql
SELECT * FROM courses WHERE
(SELECT COUNT(*) FROM course_student WHERE
  course_student.courseId = courses.courseId)
> 5;
```

---

## 8. Which SQL statement would you use to modify the structure of an existing table?

- `MODIFY TABLE`
- **`ALTER TABLE`**
- `CHANGE TABLE`
- `UPDATE TABLE`

`ALTER TABLE`

---

## 9. What is the purpose of an index in a SQL database?

- To enforce data integrity
- **To speed up data retrieval operations**
- To create relationships between tables
- To encrypt sensitive data

To speed up data retrieval operations

---

## 10. In Next.js App Router, which file is used to define a layout that applies to all pages in a specific route segment?

- `_layout.tsx`
- **`layout.tsx`**
- `page.tsx`
- `template.tsc`

`layout.tsx`

---

## 11. Explain the difference between `'use client'` and `'use server'` directives in Next.js and when you would use each one

`use client` makes the page render on the client and
`user server` makes the page render on the server.

---

## 12. Explain the differences between Server-Side Rendering (SSR), Client-Side Rendering (CSR), and Static Site Generation (SSG) in Next.js. Include the benefits and trade-offs of each approach

SSR renders the page on the server every time a request is sent.
CSR renders the page on the client (browser) every request.
SSG renders the page at compile time once.

---

## 13. In Next.js App Router, what's the difference between a static route and a dynamic route?

- Static routes are pre-rendered at build time, while dynamic routes are rendered on the client
- Static routes don't accept parameters, while dynamic routes require parameters
- Static routes are faster than dynamic routes in all cases
- **Static routes have fixed URLs, while dynamic routes can capture variable parts of the URL**

  Static routes have fixed URLs, while dynamic routes can capture variable parts of the URL

---

## 14. How would you create a dynamic route in Next.js App Router that captures a course ID?

### Complete the folder structure

```
src/
  app/
    courses/
      [:id]/
        page.tsx
```

---

## 15. How would you implement a loading state for a specific route in Next.js App Router?

By making a loading.tsx file in the route directory.
