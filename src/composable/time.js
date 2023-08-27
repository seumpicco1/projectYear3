const time = (data) => {
  const options = { hour12: false, day: "numeric", month: "short",year: "numeric", hour: "2-digit", minute: "2-digit",};
  return new Date(data).toLocaleString('en-GB',options)
}

export { time };
