import { JsonForms } from '@jsonforms/react';
import { type JsonFormsCore } from '@jsonforms/core';
import { type Maybe } from '../gql/graphql';
import React, { useCallback, useState } from 'react';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';
import { graphql } from '../gql';
import { useMutation } from 'urql';
import { Button } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import CursorToggle from '../components/CursorToggle';

const initialData = {
  classificationReference: null as Maybe<string>,
  context: '',
  contextId: '',
  entityClassification: '',
};

const schema = {
  type: 'object',
  properties: {
    classificationReference: {
      type: ['string', 'null'],
    },
    context: {
      type: 'string',
      minLength: 1,
    },
    contextId: {
      type: 'string',
      minLength: 1,
    },
    entityClassification: {
      type: 'string',
      minLength: 1,
    },
  },
};

const CreateEntityMutation = graphql(`
  mutation CreateEntity($input: CreateEntityInput!) {
    createEntity(input: $input) {
      successful
      result {
        entityGuid
      }
    }
  }
`);

const CreateEntity: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(undefined as Pick<JsonFormsCore, 'errors'>['errors']);
  const [{ fetching }, createEntity] = useMutation(CreateEntityMutation);

  const onChange = useCallback(
    ({ data, errors }: { data: typeof initialData } & Pick<JsonFormsCore, 'errors'>) => {
      setData(data);
      setErrors(errors);
    },
    [],
  );

  const onSubmit = useCallback(() => {
    void createEntity({ input: data })
      .then((mutationResult) => {
        if (mutationResult.error) throw mutationResult.error;
        if (!mutationResult.data) throw new Error();
        if (!mutationResult.data.createEntity.successful) throw new Error();
        if (!mutationResult.data.createEntity.result) throw new Error();

        const toastMessage = 'Entity created.';
        toast.success(toastMessage);

        setData(initialData);
      })
      .catch((_err) => {
        toast.error('Error creating entity.');
      });
  }, [data]);

  const hasErrors = Boolean(errors?.length);

  return (
    <div className="bg-light p-4 rounded border border-3">
      <JsonForms
        schema={schema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={onChange}
      />
      <CursorToggle enabled={!fetching && !hasErrors}>
        <Button
          variant="primary"
          className="my-3"
          onClick={onSubmit}
          disabled={fetching || hasErrors}
        >
          {fetching ? 'Loading...' : 'Submit'}
        </Button>
      </CursorToggle>
    </div>
  );
};

export default CreateEntity;
