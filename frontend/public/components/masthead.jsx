import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Brand,
  Masthead as PfMasthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  PageToggleButton,
} from '@patternfly/react-core';
import { BarsIcon } from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import { useNavigate } from 'react-router-dom-v5-compat';
import { MastheadToolbar } from './masthead-toolbar';
import { getBrandingDetails } from './utils/branding';

export const Masthead = React.memo(({ isMastheadStacked, isNavOpen, onNavToggle }) => {
  const details = getBrandingDetails();
  const navigate = useNavigate();
  const defaultRoute = '/';
  const logoProps = {
    href: defaultRoute,
    // use onClick to prevent browser reload
    onClick: (e) => {
      e.preventDefault();
      navigate(defaultRoute);
    },
  };

  return (
    <PfMasthead id="page-main-header" display={{ default: isMastheadStacked ? 'stack' : 'inline' }}>
      <MastheadToggle>
        <PageToggleButton onSidebarToggle={onNavToggle} isSidebarOpen={isNavOpen}>
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand component="a" {...logoProps}>
          <Brand src={details.logoImg} alt={details.productName} data-test="brand-image" />
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <MastheadToolbar isMastheadStacked={isMastheadStacked} />
      </MastheadContent>
    </PfMasthead>
  );
});

Masthead.propTypes = {
  isMastheadStacked: PropTypes.bool,
  isNavOpen: PropTypes.bool,
  onNavToggle: PropTypes.func,
};
