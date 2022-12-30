import React, { useState } from "react";
import {
  Flex,
  VStack,
  Heading,
  FormControl,
  Input,
  InputGroup,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  List,
  ListItem,
  OrderedList,
  ListIcon,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function App() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const [shopList, setShopList] = useState([]);

  // console.log(shopList);

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
        { id: new Date().getMilliseconds(), item: item, price: price },
      ]);
      setItem("");
      setPrice("");
    } else {
      alert("Please item or price cannot be blank")
    }
  };

  const displayShoppingItem = shopList.map((value) => {
    const { id, item, price } = value;

    return (
      <List>
        <ListItem textTransform={"capitalize"}>{item}</ListItem>
      </List>
    );
  });

  const displayShoppingPrice = shopList.map((value) => {
    const { id, item, price } = value;

    return (
      <List>
        <ListItem>{`# ${price}`}</ListItem>
      </List>
    );
  });

  return (
    <Flex minHeight={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <VStack>
        <VStack gap={2} as={"form"} marginBottom={35}>
          <Heading textTransform={"capitalize"} color={"red"}>
            my shopping list
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
        <TableContainer>
          <Table variant="simple" colorScheme="red">
            <Thead>
              <Tr>
                <Th>Items</Th>
                <Th>Prices</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td> {displayShoppingItem}</Td>
                <Td>{displayShoppingPrice}</Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Total</Th>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </VStack>
    </Flex>
  );
}

export default App;
