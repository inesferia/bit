import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@bit/bit.evangelist.elements.icon';
import { Input } from '@bit/bit.evangelist.input.input';
import { ComponentTree } from './component-tree';
import styles from './styles.module.scss';
import { ComponentID } from '../../component';

type SideBarProps = {
  components: ComponentID[];
  selected?: string;
  onSelectComponent?: (component: ComponentID) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function SideBar({ components, selected, ...rest }: SideBarProps) {
  const componentIds = useMemo(() => components.map((id) => id.fullName), [components]);
  const history = useHistory();

  const handleSelect = useCallback(
    (id: string, event?: React.MouseEvent) => {
      event?.preventDefault();

      const path = makeComponentUrl(id);
      return history.push(path);
    },
    [history]
  );

  return (
    <div {...rest}>
      <div className={styles.inputWrapper}>
        <Input placeholder="Find components" error={false} className={styles.input} />
        <Icon of="discovery" className={styles.searchIcon} />
      </div>
      <ComponentTree selected={selected} onSelect={handleSelect} components={componentIds} />
    </div>
  );
}

// @TODO - move this to router extension
function makeComponentUrl(id: string) {
  return `/${id}${getStickyUrl()}`;
}

function getStickyUrl() {
  if (typeof window === 'undefined') return '';

  const [, section] = window.location.pathname.split('~');

  return section ? `/~${section}` : '';
}
