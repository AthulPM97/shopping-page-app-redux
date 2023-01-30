import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";

function App() {
  //store
  const showCart = useSelector((state) => state.cart.showCart);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  //states
  const [standBy, setStandBy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  //side effects
  useEffect(() => {
    const putCartItems = async () => {
      try {
        setStandBy(true);
        const response = await fetch(
          "https://shopping-page-app-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(items),
            headers: {
              "Content-Type": "application/JSON",
            },
          }
        );
        if(response.ok) {
          setStandBy(false);
          setSuccess(true);
        }
      } catch (err) {
        setStandBy(false);
        setFailed(true);
        console.log(err);
      }
    };
    putCartItems();
  }, [items]);

  console.log(items);

  return (
    <div>
      {standBy && <Notification title="Sending..." message="Sending cart data!"/>}
      {success && <Notification title="Success!" message="Sent cart data successfully!" status="success"/>}
      {failed && <Notification title="Error!" message="Sending cart data failed!" status="error"/>}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </div>
  );
}

export default App;
