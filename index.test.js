const target = require('.')

test('image, streamed', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100})
  expect(result).toMatchSnapshot()
})

test('image, streamed, htmlColor', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, htmlColor: true})
  expect(result).toMatchSnapshot()
})

test('image, streamed, raw', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, raw: true})
  expect(result).toMatchSnapshot()
})
