import styled from 'styled-components';
import Slick from './Slick';

interface itemsProps {
  item: string;
  name: string;
}

const SliderItem = styled.div`
  width: 80%;
  margin: 0 auto;
  height: inherit;
  img {
    max-width: 100%;
    height: inherit;
    width: auto;
    margin: 0 auto; /* it centers any block level element */
  }
`;

const items: itemsProps[] = [
  {
    item: 'https://cdn.pixabay.com/photo/2017/07/03/07/02/feedback-2466835_960_720.jpg',
    name: '이미지01',
  },
  {
    item: 'https://cdn.pixabay.com/photo/2017/07/03/07/00/feedback-2466829_960_720.jpg',
    name: '이미지02',
  },
];

function Item() {
  return (
    <Slick>
      {items.map((item, index) => (
        <SliderItem key={index}>
          <img src={item.item} alt={item.name} />
        </SliderItem>
      ))}
    </Slick>
  );
}

export default Item;
