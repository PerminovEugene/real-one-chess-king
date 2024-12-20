import {
  CastlingMovementRule,
  CastlingMovementRuleMeta,
} from "./castling.rule";
import { MovementRuleMeta } from "./movement-rule";
import { PositionSpecificMovementRuleMeta } from "./position-specific-movement.rule";

export function isPositionSpecificMovementRuleMeta(
  rule: RuleMeta
): rule is PositionSpecificMovementRuleMeta {
  return (
    (rule as PositionSpecificMovementRuleMeta).activatePositions !== undefined
  );
}
export function isMovementRuleMeta(rule: RuleMeta): rule is MovementRuleMeta {
  return !isPositionSpecificMovementRuleMeta(rule);
}
export function isCastlingRuleMeta(
  rule: RuleMeta
): rule is CastlingMovementRuleMeta {
  return (
    (rule as CastlingMovementRuleMeta).foreginPieceCoordinate !== undefined
  );
}

export type RuleMeta =
  | MovementRuleMeta
  | PositionSpecificMovementRuleMeta
  | CastlingMovementRuleMeta;