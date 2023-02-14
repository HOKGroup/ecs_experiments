import React from 'react';
import Select from 'react-select';
import { RelationshipType } from '../CreateRelationship';

interface Props {
  onSelect: (relationshipType: RelationshipType | null) => void;
}

const options = [
  {
    label: 'Member Of',
    value: 'memberOf',
  },
  {
    label: 'Uses',
    value: 'uses',
  },
].sort((a, b) => a.label.localeCompare(b.label));

const RelationshipTypeSelector: React.FC<Props> = ({ onSelect }) => {
  return (
    <div>
      <div className="pb-2">Select Relationship Type</div>
      <Select
        backspaceRemovesValue={false}
        styles={{
          control: (base, _props) => ({
            ...base,
            cursor: 'pointer',
          }),
        }}
        isClearable={true}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        menuPlacement="bottom"
        onChange={onSelect}
        options={options}
      />
    </div>
  );
};

export default RelationshipTypeSelector;
