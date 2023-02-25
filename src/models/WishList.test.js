import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
import { WishList, WishListItem } from "./WishList"
import { reaction } from "mobx"

it("can create a instance of a model", () => {
  const item = WishListItem.create({
      "name": "Piplup Sitting Cuties Plush",
      "price": 10.99,
      "image": "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P8020_701-29490_01.jpg"
  })

  expect(item.price).toBe(10.99)
  item.changeName("Pikachu Sitting Cuties Plush")
  expect(item.name).toBe("Pikachu Sitting Cuties Plush")
})

it("can create a wishlist", () => {
  const list = WishList.create({
    items: [
      {
        "name": "Piplup Sitting Cuties Plush",
        "price": 10.99
      }
    ]
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].price).toBe(10.99)
})

it("can add new items", () => {
  const list = WishList.create()
  const states = []
  onSnapshot(list, snapshot => {
    states.push(snapshot)
  })

  list.add({
    name: "Piplup Sitting Cuties Plush",
    price: 10.99
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe("Piplup Sitting Cuties Plush")
  list.items[0].changeName("Prinplup Sitting Cuties Plush")
  expect(list.items[0].name).toBe("Prinplup Sitting Cuties Plush")

  expect(getSnapshot(list)).toMatchSnapshot()

  expect(states).toMatchSnapshot()
})

it("can add new items - 2", () => {
  const list = WishList.create()
  const patches = []
  onPatch(list, patch => {
    patches.push(patch)
  })

  list.add({
    name: "Piplup Sitting Cuties Plush",
    price: 10.99
  })

  expect(list.items.length).toBe(1)
  expect(list.items[0].name).toBe("Piplup Sitting Cuties Plush")
  list.items[0].changeName("Prinplup Sitting Cuties Plush")
  expect(list.items[0].name).toBe("Prinplup Sitting Cuties Plush")

  expect(getSnapshot(list)).toMatchSnapshot()

  expect(patches).toMatchSnapshot()
})

it("can calculate the total price of wishlist", () => {
  const list = WishList.create({
    items: [
      {
        name: "Piplup Sitting Cuties Plush",
        price: 10.99,
        image: "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P8020_701-29490_01.jpg"
      },
      {
        name: "Prinplup Sitting Cuties Plush",
        price: 10.99,
        image: "https://www.pokemoncenter.com/images/DAMRoot/High/10000/P8020_701-29489_01.jpg"
      }
    ]
  })

  expect(list.totalPrice).toBe(21.98)
  
  let changed = 0
  reaction(() => list.totalPrice, () => changed++)
  console.log(list.totalPrice)
  list.items[0].changeName("Test")
  expect(changed).toBe(0)
  list.items[0].changePrice(10)
  expect(changed).toBe(1)
})