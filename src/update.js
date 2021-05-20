import vehicles from './vehicles'

export async function main(event) {
  const vehicle = vehicles[event.pathParameters.id]

  if(!vehicle) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: true })
    }
  }

  const data = JSON.parse(event.body)
  vehicle.content = data.content
  return {
    statusCode: 200,
    body: JSON.stringify(vehicle)
  }
}