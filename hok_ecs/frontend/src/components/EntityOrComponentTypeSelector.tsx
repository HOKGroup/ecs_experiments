import React, { memo, useCallback } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import type { EntityOrComponentType } from '../App';

interface Props {
  entityTypes: string[];
  componentTypes: string[];
  onSelect: (selected: EntityOrComponentType) => void;
}

type Option = {
  type: 'entity' | 'component';
  value: string;
  label: string;
};

const EntityOrComponentTypeSelector: React.FC<Props> = ({
  entityTypes,
  componentTypes,
  onSelect,
}) => {
  const entityOptions = entityTypes.map(
    (t) => ({ type: 'entity', value: t, label: t } as Option),
  );
  const componentOptions = componentTypes.map(
    (t) => ({ type: 'component', value: t, label: t } as Option),
  );

  const onChange = useCallback(
    (newValue: SingleValue<Option>, _actionMeta: ActionMeta<Option>) => {
      if (!newValue) return;

      onSelect(newValue);
      //if (newValue.type === "entity") {
      //onSelectEntityType(newValue.value)
      //} else if (newValue.type === "component") {
      //onSelectComponentType(newValue.value)
      //}
    },
    [onSelect],
  );

  return (
    <div>
      <div>Select Entity/ Or Component Type</div>
      <Select
        onChange={onChange}
        options={[
          {
            label: 'Entity',
            options: entityOptions,
          },
          {
            label: 'Component',
            options: componentOptions,
          },
        ]}
      />
    </div>
  );
};

export default memo(EntityOrComponentTypeSelector);
