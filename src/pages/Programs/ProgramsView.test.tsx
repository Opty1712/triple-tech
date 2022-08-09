import { shallow } from '../../utils/testUtils';
import { ProgramsView, ProgramsViewProps } from './ProgramsView';

const props: ProgramsViewProps = {
  isLoading: false,
  programs: [],
  name: '',
  handleNameChange: jest.fn(),
  changeStatus: jest.fn(),
  status: {
    ACTIVE: false,
    PAUSE_SCHEDULED: false,
    PAUSED: false,
  },
};

describe('ProgramsView', () => {
  it('should show loading', () => {
    const result = shallow(<ProgramsView {...props} isLoading={true} />);

    expect(result.find('tr').text()).toBe('Loading...');
  });

  it('should show nothing found', () => {
    const result = shallow(<ProgramsView {...props} />);

    expect(result.find('tr').text()).toBe('Nothing found');
  });

  it('should show programs', () => {
    const result = shallow(
      <ProgramsView
        {...props}
        programs={[
          {
            id: '1',
            name: '',
            pause_at: '',
            return_percentage: '',
            status: 'ACTIVE',
            threshold: '',
          },
        ]}
      />
    );

    expect(result.find('tr').text()).toBe('ACTIVE');
  });
});
