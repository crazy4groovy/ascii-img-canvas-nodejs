const target = require('.')

test('image, non-streamed', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100})
  expect(result).toMatchSnapshot()
})

test('image, streamed', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 100, width: 100, stream: true})
  expect(result).toMatchSnapshot()
})
