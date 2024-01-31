import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card'
import Cart from './components/Cart/Cart'
import { getData } from './constants/db'

const courses = getData()
const telegram = window.Telegram.WebApp;

const App = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    telegram.ready()
  })

  const onAddItem = item => {
    const exisItem = cartItems.find(c => c.id === item.id)

    if (exisItem) {
      const newData = cartItems.map(c =>
        c.id === item.id
          ? { ...exisItem, quantity: exisItem.quantity + 1 }
          : c
      );
      console.log(newData);
      setCartItems(newData)
    } else {
      const newData = [...cartItems, { ...item, quantity: 1 }]
      setCartItems(newData)
    }
  }

  const onRemoveItem = item => {
		const existItem = cartItems.find(c => c.id == item.id);
    console.log(existItem);

		if (existItem.quantity === 1) {
			const newData = cartItems.filter(c => c.id !== existItem.id);
      console.log(newData);
			setCartItems(newData);
		} else {
			const newData = cartItems.map(c =>
				c.id === existItem.id
					? { ...existItem, quantity: existItem.quantity - 1 }
					: c
			);
			setCartItems(newData);
		}
	};

  const onCheckout = () => {
    telegram.MainButton.text = 'Sotib olish';
    telegram.MainButton.show()
  }

  const onSendData = useCallback(() => {
    telegram.senData(JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    telegram.onEvent('maimButtonClick', onSendData)

    return ()=> telegram.offEvent('mainButtonClick', onSendData)
  }, [cartItems])

  return (
    <>
      <h1>Sammi kurslar</h1>
      <Cart cartItems={cartItems} onCheckout={onCheckout} />
      <div className="cards__container">
        {courses.map(course => (
          <Card 
          key={course.id} 
          course={course} 
          onAddItem={onAddItem} 
          onRemoveItem={onRemoveItem} />
        ))}
      </div>
    </>
  )
}

export default App