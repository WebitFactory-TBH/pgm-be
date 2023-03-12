import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'

const prisma = new PrismaClient()
async function main () {
  await prisma.chain.deleteMany({})
  await prisma.blockchain.deleteMany({})

  const evmAbi = fs.readFileSync('./prisma/evm.abi.json', 'utf8')
  const mxAbi = fs.readFileSync('./prisma/multiversX.abi.json', 'utf8')

  await prisma.blockchain.createMany({
    data: [
      {
        name: 'EVM',
        contractABI: evmAbi
      },
      {
        name: 'MultiverseX',
        contractABI: mxAbi
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
      contractAddress: '0x85e5d6475ebc5980445acceac0c12f1d5cb750a5',
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
      contractAddress: 'erd1qqqqqqqqqqqqqpgqt6xlauatj3phxu39ur9uw390ugxugza8rlzqumyhmy',
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
