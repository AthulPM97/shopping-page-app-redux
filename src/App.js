import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { getData, sendCartData } from "./store/cart";

let isInitial = true;

function App() {
  //store
  const showCart = useSelector((state) => state.cart.showCart);
  const items = useSelector((state) => state.cart.items);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(getData());
      return;
    }

    dispatch(sendCartData(items));
  }, [items, dispatch]);

  return (
    <div>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </div>
  );
}

export default App;
