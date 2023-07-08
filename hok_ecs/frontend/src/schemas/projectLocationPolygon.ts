import { z } from 'zod';

const projectLocationPolygon = z.object({
  type: z.enum(['Polygon']).describe('Coordinates'),
  coordinates: z.array(z.array(z.array(z.number()).min(2)).min(4)),
  bbox: z.array(z.number()).min(4).optional(),
});

export default projectLocationPolygon;

export type ProjectLocationPolygon = z.infer<typeof projectLocationPolygon>;
