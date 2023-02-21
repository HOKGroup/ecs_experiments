import React, { memo, useCallback } from 'react';
import Select, { PropsValue } from 'react-select';
import { FilterOptionOption } from 'react-select/dist/declarations/src/filters';
import CursorToggle from '../../components/CursorToggle';

interface EntityType {
  label: string;
  entityClassification: string;
}

interface ComponentType {
  label: string;
  componentType: string;
}

interface Props {
  entityTypes: EntityType[];
  componentTypes: ComponentType[];
  onSelect: (selected: Option | null) => void;
  isEnabled?: boolean;
  loading?: boolean;
  value: PropsValue<Option>;
}

type EntityOption = {
  type: 'entity';
} & EntityType;

type ComponentOption = {
  type: 'component';
} & ComponentType;

type Option = EntityOption | ComponentOption;

const EntityOrComponentTypeSelector: React.FC<Props> = ({
  entityTypes,
  componentTypes,
  onSelect,
  isEnabled,
  loading,
  value,
}) => {
  const enabled = isEnabled === undefined || isEnabled;

  const entityOptions = entityTypes.map(
    (t) => ({ type: 'entity', ...t } as Option),
  );
  const componentOptions = componentTypes.map(
    (t) => ({ type: 'component', ...t } as Option),
  );

  // Replaces default react-select filter function
  // with case-sensitive version
  const filterOption = useCallback(
    (option: FilterOptionOption<Option>, inputValue: string) => {
      return option.label.includes(inputValue);
    },
    [],
  );

  const label =
    entityTypes.length > 0
      ? 'Select Entity Or Component Type'
      : 'Select Component Type';

  return (
    <div>
      <div className="pb-2">{label}</div>
      <CursorToggle enabled={enabled}>
        <Select
          value={value}
          isLoading={loading ?? false}
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
