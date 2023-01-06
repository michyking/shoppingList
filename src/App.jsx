import React, { useState } from "react";
import { DeleteIcon } from '@chakra-ui/icons'
import {
  Flex,
  VStack,
  Heading,
  FormControl,
  Input,
  InputGroup,
  Button,
  Text,
} from "@chakra-ui/react";

function App() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const [shopList, setShopList] = useState([]);

  const changeItemHandler = (e) => {
    setItem(e.target.value);
  };
  const changePriceHandler = (e) => {
    setPrice(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (item && price) {
      setShopList((prev) => [
        ...prev,
        {
          id: new Date().getMilliseconds(),
          item: item,
          price: price,
          isEdit: false,
        },
      ]);
      setItem("");
      setPrice("");
    } else {
      alert("Please item or price cannot be blank");
    }
  };

  const displayShoppingItem = shopList.map((value) => {
    const { id, item, price } = value;

    return (
      <Text textTransform={"capitalize"} marginBottom={'7px'}>
        {item}
      </Text>
    );
  });

  const displayShoppingPrice = shopList.map((value) => {
    const { id, item, price } = value;

    return (
      <Text marginBottom={'7px'}>
        {`# ${price}`}
        <DeleteIcon onClick={() => deleteHandler(id)} marginLeft={"10px"}/>
      </Text>
    );
  });

  const deleteHandler = (id) => {
    const newShopList = shopList.filter((value) => value.id !== id);

    setShopList(newShopList);
  };

  const editHandler = (id) => {
    const newShopList = shopList.filter((value) => value.id !== id);
    const selectedItem = shopList.find((value) => value.id === id);

    setShopList({
      shopList: newShopList,
      item: selectedItem.item,
      price: selectedItem.price,
      id: id,
      isEdit: true,
    });
  };

  const totalPrice = shopList.reduce((total, list) => {
    const { id, item, price } = list;
    return total + Number(price);
  }, 0);

  // // OR IT CAN WORK LIKE THIS BELOW

  // let total = 0;

  // shopList.forEach(list => {
  //   const {id, item, price} = list;
  //   total = total + Number(price);
  // })

  const clearList = () => {
    setShopList([]);
  };

  return (
    <Flex
      className="App"
      minHeight={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}>
      <VStack>
        <VStack gap={2} as={"form"} marginBottom={35}>
          <Heading textTransform={"capitalize"} color={"red"}>
            shopping notePad
          </Heading>
          <FormControl>
            <InputGroup marginBottom={2}>
              <Input
                borderColor={"red"}
                onChange={changeItemHandler}
                value={item}
                type={"text"}
                placeholder="Enter an Item"
                // variant="filled"
                _focus={{ ring: 2, ringColor: "red", border: 0 }}
              />
            </InputGroup>
            <InputGroup marginBottom={2}>
              <Input
                borderColor={"red"}
                onChange={changePriceHandler}
                value={price}
                type={"number"}
                placeholder="Price of the item"
                // variant="filled"
                _focus={{ ring: 2, ringColor: "red", border: 0 }}
              />
            </InputGroup>
          </FormControl>
          <Button
            marginBottom={"10px"}
            type={"submit"}
            colorScheme={"red"}
            onClick={submitHandler}>
            Submit
          </Button>
        </VStack>
        <div className="container">
          <Heading className="h1" textAlign={"center"} fontSize={"1.4rem"}>
            My list
          </Heading>
          <div className="Display">
            <div>{displayShoppingItem}</div>
            <div>{displayShoppingPrice}</div>
          </div>
          <div className="Display">
            <div>TOTAL</div>
            <div>{`# ${totalPrice}`}</div>
          </div>
          
        </div>
        <Button
          onClick={clearList}
          colorScheme={"red"}
          marginTop={"40px"}
          width={"20rem"}>
          Clear Items
        </Button>
      </VStack>
    </Flex>
  );
}

export default App;
