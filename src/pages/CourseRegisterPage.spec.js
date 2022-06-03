import React from 'react';
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,

} from '@testing-library/react';
import { CourseSRegisterPage } from './CourseRegisterPage';

describe('UserSignupPage', () => {
    describe('layout', () => {
        it('has header of Register Course', () => {
            const { container } = render(<CourseSRegisterPage />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Register Course');
          });
    })

});