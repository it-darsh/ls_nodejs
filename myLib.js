module.exports = function curDateTime() {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth().toString().length == 1) ? '0' + Number(now.getMonth() + 1) : now.getMonth() + 1;
  const day = (now.getDate() < 10) ? ('0' + now.getDate()) : now.getDate();
  const hours = (now.getHours() < 10) ? '0' + now.getHours() : now.getHours();
  const minutes = (now.getMinutes() < 10) ? '0' + now.getMinutes() : now.getMinutes();
  const seconds = (now.getSeconds() < 10) ? '0' + now.getSeconds() : now.getSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} DMT+`;
}
module.exports = function curDateTimeUTC() {
  const now = new Date();
  const year = now.getUTCFullYear().toString();
  const month = (now.getUTCMonth().toString().length == 1) ? '0' + Number(now.getUTCMonth() + 1) : now.getUTCMonth() + 1;
  const day = (now.getUTCDate() < 10) ? ('0' + now.getUTCDate()) : now.getUTCDate();
  const hours = (now.getUTCHours() < 10) ? '0' + now.getUTCHours() : now.getUTCHours();
  const minutes = (now.getUTCMinutes() < 10) ? '0' + now.getUTCMinutes() : now.getUTCMinutes();
  const seconds = (now.getUTCSeconds() < 10) ? '0' + now.getUTCSeconds() : now.getUTCSeconds();

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
}