import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
async function main () {
  await prisma.chain.deleteMany({})
  await prisma.blockchain.deleteMany({})

  await prisma.blockchain.createMany({
    data: [
      {
        name: 'EVM',
        contractABI: fs.readFileSync('./prisma/evm.abi.json').toString()
      },
      {
        name: 'MultiverseX',
        contractABI: fs.readFileSync('./prisma/multiversX.abi.json').toString()
      }
    ]
  })

  const blockchains = await prisma.blockchain.findMany()

  await prisma.chain.create({
    data: {
      blockchain: {
        connect: {
          id: blockchains[0].id
        }
      },
      name: 'Mumbai',
      contractAddress: '',
      metadata: {}
    }
  })

  await prisma.chain.create({
    data: {
      blockchain: {
        connect: {
          id: blockchains[1].id
        }
      },
      name: 'MultiversX Devnet',
      contractAddress: '',
      metadata: {}
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
