import bcrypt from "bcrypt";
import { PrismaClient } from "../../generated/prisma/client.ts";

const prisma = new PrismaClient();

export function showLogin(req, res) {
  res.render("login");
}

export function showRegister(req, res) {
  res.render("register");
}

export async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.redirect("/login");
  } catch (error) {
    res.status(400).send("El usuario ya existe");
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Credenciales incorrectas");
  }

  req.session.userId = user.id;
  req.session.role = user.role;

  if (user.role === "admin") {
    return res.redirect("/admin");
  }

  res.redirect("/user");
}

export function logoutUser(req, res) {
  req.session.destroy();
  res.redirect("/login");
}

export function userPage(req, res) {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  res.render("user");
}
