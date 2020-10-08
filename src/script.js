const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const newEvent = await prisma.event.create({
    data: {
      title: 'Test User 3 2',
      date: '20.02.2020',
      event_start: '20:00',
      description: 'Welcome to my first event',
      is_public: false,
      event_type: 'local',
      street_and_house_number: 'Test Street 1',
      city: 'Test City',
      country: 'Test Country',
      user: {
        connect: {
          user_id: '726d620e-33ca-4865-a379-473f30085ebd'
        }
      }      
    }
  })
  const allEvents = await prisma.event.findMany()
  console.log(allEvents)
}

main()
.catch(e => {
  throw e
})
.finally( async () => {
  await prisma.$disconnect()
})