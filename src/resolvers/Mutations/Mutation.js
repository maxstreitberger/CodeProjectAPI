const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../../utils')

async function post(parent, args, context, info) {
  const userID = getUserId(context)
  const newEvent = context.prisma.event.create({
    data: {
      title: args.title,
      date: args.date,
      event_start: args.event_start,
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
  console.log(args)
  return context.prisma.event.update({
    where: { event_id: args.event_id },
    data: { 
      ...args
    }
  })
}

async function register(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({
    data: {
      first_name: "",
      last_name: "",
      username: args.username,
      email: args.email,
      password: password
    }
  })

  const token = jwt.sign({ userId: user.user_id }, APP_SECRET)

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
  console.log(user)
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign({ userId: user.user_id }, APP_SECRET)

  return {
    user,
    token
  }
}

module.exports = {
  post,
  deleteEvent,
  register,
  login,
  updateEvent
}