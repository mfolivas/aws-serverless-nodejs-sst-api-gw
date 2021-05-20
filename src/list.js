import vehicles from './vehicles'

export async function main() {
  return {
    statusCode: 200,
    body: JSON.stringify(vehicles)
  }
}