import Adapter from '@cfaester/enzyme-adapter-react-18';
import '@testing-library/jest-dom';
import * as Enzyme from 'enzyme';
import { ReactElement } from 'react';

export {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

export const shallow = (children: ReactElement) => Enzyme.shallow(children);
