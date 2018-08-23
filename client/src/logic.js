export const fraudRisk = (ticket, users) => {
  let risk = 2
  if (users[ticket.user.id].tickets.length < 2) risk += 4

  const averagePrice = users[ticket.user.id].tickets.reduce((a, b) => {
    return a + b.price
  }, 0) / users[ticket.user.id].tickets.length

  const difference = averagePrice - ticket.price

  if (difference > 0) {
    risk += difference
  } else if (difference > -15) {
    risk += difference
  } else {
    risk -= 15
  }
  const creationTime = new Date(ticket.time)
  const creationHours = creationTime.getHours();
  if (creationHours > 9 && creationHours < 17) {
    risk -= 13
  } else {
    risk += 13
  }
  if (ticket.comments.length > 3) risk += 6

  if (risk < 2) risk = 2
  if (risk > 98) risk = 98
  return risk
}