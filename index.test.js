const target = require('.')

test('remote image, no dimensions', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc)
  expect(result).toMatchSnapshot()
})

test('remote image, square-20px', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 20, width: 20})
  expect(result).toMatchSnapshot()
})

test('remote image, height-50px', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 50})
  expect(result).toMatchSnapshot()
})

test('remote image, width-50px', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {width: 50})
  expect(result).toMatchSnapshot()
})

test('remote image, htmlColor', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 50, width: 50, htmlColor: true})
  expect(result).toMatchSnapshot()
})

test('remote image, raw', async () => {
  const imgSrc = 'https://pbs.twimg.com/profile_images/613094304094003200/5ACLHxhy_400x400.jpg'
  const result = await target(imgSrc, {height: 50, width: 50, raw: true})
  expect(result).toMatchSnapshot()
})

//

test('local image, square-50px', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 50, width: 50})
  expect(result).toMatchSnapshot()
})

test('local image, square-20px', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 20, width: 20})
  expect(result).toMatchSnapshot()
})

test('local image, width-20px height-25px', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 25, width: 20})
  expect(result).toMatchSnapshot()
})

test('local image, height-20px', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 20})
  expect(result).toMatchSnapshot()
})

test('local image, width-100px', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {width: 100})
  expect(result).toMatchSnapshot()
})

test('local image, square-50px, htmlColor', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 50, width: 50, htmlColor: true})
  expect(result).toMatchSnapshot()
})

test('local image, square-50px, raw', async () => {
  const imgSrc = './resources/cartoon-dog.jpg'
  const result = await target(imgSrc, {height: 50, width: 50, raw: true})
  expect(result).toMatchSnapshot()
})
