import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {SettingAction} from '../../SettingAction';
import {SettingToggle} from '../SettingToggle';
import {Button} from '../../Button';

describe('<SettingToggle />', () => {
  function getComponentProps(node: React.ReactNode) {
    return (node as JSX.Element).props;
  }

  describe('action', () => {
    it('passes a button for the action into SettingAction', () => {
      const action = {
        content: 'Click me!',
        onAction: noop,
      };
      const toggle = mountWithApp(<SettingToggle action={action} />);
      const {children} = getComponentProps(
        toggle.find(SettingAction)!.prop('action'),
      );
      expect(children).toBe('Click me!');
    });
  });

  describe('enabled', () => {
    it('makes the button primary when not enabled', () => {
      const action = {
        content: 'Click me!',
        onAction: noop,
      };
      const toggle = mountWithApp(<SettingToggle action={action} />);
      const {primary} = getComponentProps(
        toggle.find(SettingAction)!.prop('action'),
      );
      expect(primary).toBe(true);
    });

    it('makes the button secondary when enabled', () => {
      const action = {
        content: 'Click me!',
        onAction: noop,
      };
      const toggle = mountWithApp(<SettingToggle action={action} enabled />);
      const {primary} = getComponentProps(
        toggle.find(SettingAction)!.prop('action'),
      );
      expect(primary).toBe(false);
    });
  });

  describe('children', () => {
    it('renders the given children', () => {
      const children = <div id="someId" />;
      const toggle = mountWithApp(<SettingToggle>{children}</SettingToggle>);
      expect(toggle).toContainReactComponent('div', {id: 'someId'});
    });
  });

  describe('accessibility', () => {
    it('renders as a switch widget', () => {
      const toggle = mountWithApp(<SettingToggle enabled />);
      expect(toggle).toContainReactComponent(Button, {role: 'switch'});
    });

    describe('when enabled', () => {
      it('updates `aria-checked`', () => {
        const toggle = mountWithApp(<SettingToggle enabled />);
        expect(toggle).toContainReactComponent(Button, {
          role: 'switch',
          ariaChecked: 'true',
        });
      });
    });

    describe('when disabled', () => {
      it('updates `aria-checked`', () => {
        const toggle = mountWithApp(<SettingToggle enabled={false} />);
        expect(toggle).toContainReactComponent(Button, {
          role: 'switch',
          ariaChecked: 'false',
        });
      });
    });
  });
});

function noop() {}
