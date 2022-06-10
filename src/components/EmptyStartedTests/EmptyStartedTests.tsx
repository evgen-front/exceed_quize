import { NavLink } from 'react-router-dom';
import { HOME } from '../../Router/routes';

export const EmptyStartedTests = () => {
  return (
    <div className='testListItem'>
      <span className='testListItem_announce'>вы пока не начали ни один тест</span>
      <NavLink to={HOME} className={'testListItem_announce'}>
        найти тест
      </NavLink>
    </div>
  );
};
