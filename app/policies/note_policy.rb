class NotePolicy < ApplicationPolicy
  # use board as record
  def index?
    record.nil? || record.belong_to_user?(user) || record.published?
  end

  # use board as record
  def create?
    record.owned_by_user?(user) || record.public_rw?
  end

  def show?
    record.visible_to_user?(user)
  end

  def update?
    record.changeable_by_user?(user)
  end

  def destroy?
    update?
  end

  class Scope < Scope
    def resolve
      scope.where(board: user.boards).or(scope.where(board: Board.public_ro)).or(scope.where(board: Board.public_rw))
    end
  end
end
