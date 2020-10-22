require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.KEY

async function post(parent, args, context, info) {
  const userID = context.user.user_id
  const newEvent = context.prisma.event.create({
    data: {
      title: args.title,
      date: new Date(args.date),
      event_start: new Date(args.event_start),
      description: args.description,
      is_public: args.is_public,
      event_type: args.event_type,
      street_and_house_number: args.street_and_house_number,
      city: args.city,
      country: args.country,
      host: {
        connect: {
          user_id: userID
        }
      }      
    }
  })
  return newEvent
}

async function deleteEvent(parent, args, context, info) {
  return context.prisma.event.delete({
    where: {
      event_id: args.event_id
    }
  })
}

async function updateEvent(parent, args, context, info) {
  return context.prisma.event.update({
    where: { event_id: args.event_id },
    data: { 
      ...args
    }
  })
}

async function registerAdmin(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: {
      first_name: "",
      last_name: "",
      username: args.username,
      email: args.email,
      password: password,
      role: 'ADMIN'
    }
  })

  const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role }, APP_SECRET, {expiresIn: 2419200})

  return {
    user,
    token
  }
}

async function register(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: {
      first_name: "",
      last_name: "",
      username: args.username,
      email: args.email,
      password: password,
      role: 'USER'
    }
  })

  const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role }, APP_SECRET, {expiresIn: 2419200})

  return {
    user,
    token
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: {
      email: args.email
    }
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ sub: user.user_id, username: user.username, email: user.email, role: user.role }, APP_SECRET, {expiresIn: 2419200})

  return {
    user,
    token
  }
}

async function updateUser(parent, args, context) {
  return context.prisma.user.update({
    where: { user_id: args.user_id },
    data: {
      ...args
    }
  })
}

async function deleteUser(parent, args, context) {
  return context.prisma.user.delete({
    where: { user_id: args.user_id },
  })
}

async function joinEvent(parent, args, context) {
  return context.prisma.user_Event.create({
    data: {
      User: { connect: { user_id: args.user_id }},
      Event: { connect: { event_id: args.event_id }},
    }
  })
}

module.exports = {
  post,
  deleteEvent,
  updateEvent,
  registerAdmin,
  register,
  login,
  updateUser,
  deleteUser,
  joinEvent
}