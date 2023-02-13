import React, { memo, useCallback } from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import CursorToggle from './CursorToggle';

interface Props {
  entityTypes: string[];
  componentTypes: string[];
  onSelect: (selected: Option | null) => void;
  isEnabled?: boolean;
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
  isEnabled,
}) => {
  const enabled = isEnabled === undefined || isEnabled;

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
    },
    [onSelect],
  );

  // Replaces default react-select filter function
  // with case-sensitive version
  const filterOption = useCallback(
    (option: FilterOptionOption<Option>, inputValue: string) => {
      return option.label.indexOf(inputValue) !== -1;
    },
    [],
  );

  return (
    <div>
      <div className="pb-2">Select Entity/ Or Component Type</div>
      <CursorToggle enabled={enabled}>
        <Select
          backspaceRemovesValue={false}
          isClearable={true}
          isDisabled={!enabled}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          onChange={onSelect}
          menuPlacement="top"
          filterOption={filterOption}
          classNames={{
            control: ({ isDisabled }) => (isDisabled ? 'bg-dark' : ''),
          }}
          styles={{
            control: (base, _props) => ({
              ...base,
              cursor: 'pointer',
            }),
          }}
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
      </CursorToggle>
    </div>
  );
};

export default memo(EntityOrComponentTypeSelector);
