'use strict'

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const command = process.argv[2]

switch (command) {
  case 'init':
    // Clone the official starter-kit repository
    console.log('Cloning the template GitHub repository...')
    execSync('git clone https://github.com/symbo-ls/starter-kit.git', { stdio: 'inherit' })
    console.log('Repository cloned successfully.')
    break

  case 'create': {
    // Accept X and Y arguments, defaulting to 16 x 8 if none provided
    const xArg = parseInt(process.argv[3], 10) || 16
    const yArg = parseInt(process.argv[4], 10) || 8

    console.log(`Creating a GridSelection component with ${xArg} columns and ${yArg} rows...`)

    // Write the grid settings to a JSON file (gridSettings.json)
    const config = { colCount: xArg, rowCount: yArg }
    const configPath = path.join(__dirname, 'gridSettings.json')
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))
    console.log(`Grid settings saved to ${configPath}`)
    break
  }

  default:
    console.log(`Usage: ${path.basename(process.argv[1])} <init|create> [X] [Y]`)
    break
}
