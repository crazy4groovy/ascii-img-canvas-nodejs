const target = require('.')

test('remote image, streamed', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100})
  expect(result).toMatchSnapshot()
})

test('remote image, streamed, htmlColor', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, htmlColor: true})
  expect(result).toMatchSnapshot()
})

test('remote image, streamed, raw', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, raw: true})
  expect(result).toMatchSnapshot()
})

test('local image, streamed', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 100, width: 100})
  expect(result).toMatchSnapshot()
})

test('local image, streamed, htmlColor', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, htmlColor: true})
  expect(result).toMatchSnapshot()
})

test('local image, streamed, raw', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, raw: true})
  expect(result).toMatchSnapshot()
})
