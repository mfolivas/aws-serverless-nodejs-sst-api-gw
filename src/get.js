import vehicles from './vehicles'

export async function main(event) {
  const vehicle = vehicles[event.pathParameters.id]
  return vehicle ? {
    statusCode: 200,
    body: JSON.stringify(vehicle)
  } : {
    statusCode: 404,
    body: JSON.stringify({ error: true })
  }
}