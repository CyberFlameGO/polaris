import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {GlobeMinor} from '@shopify/polaris-icons';

import {VisuallyHidden} from '../../VisuallyHidden';
import {Icon} from '../../Icon';
import {Badge} from '../Badge';

describe('<Badge />', () => {
  it('renders its children', () => {
    const badge = mountWithApp(<Badge>Badge test</Badge>);
    expect(badge.text()).toBe('Badge test');
  });

  it('accepts a status prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge status="success" />);
    expect(badge).toContainReactComponent(VisuallyHidden);
  });

  it('accepts a progress prop and renders a visually hidden label', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);
    expect(badge).toContainReactComponent(VisuallyHidden);
  });

  it('renders progress and status labels in the same element', () => {
    const badge = mountWithApp(
      <Badge progress="incomplete" status="attention" />,
    );

    expect(badge).toContainReactComponentTimes(VisuallyHidden, 1, {
      children: 'Attention Incomplete',
    });
  });

  it('does not add pip styles when progress is not provided', () => {
    const badge = mountWithApp(<Badge status="attention" />);

    expect(badge).not.toContainReactComponent('span', {
      className: 'Pip',
    });
  });

  it('renders with pip styles when progress is provided', () => {
    const badge = mountWithApp(<Badge progress="incomplete" />);

    expect(badge).toContainReactComponent('span', {
      className: 'Pip',
    });
  });

  it('does not render an icon when icon is not provided', () => {
    const badge = mountWithApp(<Badge status="attention" />);

    expect(badge).not.toContainReactComponent(Icon);
  });

  it('renders an icon when icon is provided', () => {
    const badge = mountWithApp(<Badge icon={GlobeMinor} />);

    expect(badge).toContainReactComponent(Icon, {
      source: GlobeMinor,
    });
  });

  it('prefers the icon to pip styles when both progress and icon are provided', () => {
    const badge = mountWithApp(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Badge progress="incomplete" icon={GlobeMinor} />,
    );

    expect(badge).toContainReactComponent(Icon, {
      source: GlobeMinor,
    });
    expect(badge).not.toContainReactComponent('span', {
      className: 'Pip',
    });
  });

  it('renders with a custom accessibilityLabel when a `statusAndProgressLabelOverride` is provided', () => {
    const mockAccessibilityLabel = 'mock accessibilityLabel';
    const badge = mountWithApp(
      <Badge
        status="attention"
        progress="incomplete"
        statusAndProgressLabelOverride={mockAccessibilityLabel}
      />,
    );

    expect(badge).toContainReactComponent(VisuallyHidden, {
      children: mockAccessibilityLabel,
    });
  });

  it('does not render progress or status accessibility labels when a `statusAndProgressLabelOverride` is provided', () => {
    const mockAccessibilityLabel = 'mock accessibilityLabel';
    const badge = mountWithApp(
      <Badge
        status="attention"
        progress="incomplete"
        statusAndProgressLabelOverride={mockAccessibilityLabel}
      />,
    );

    expect(badge).not.toContainReactComponent(VisuallyHidden, {
      children: 'Attention Incomplete',
    });
  });
});
