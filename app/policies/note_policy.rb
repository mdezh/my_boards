class NotePolicy < ApplicationPolicy
  # use board as record
  def index?
    record.nil? || record.belong_to_user?(user)
  end

  # use board as record
  def create?
    record.owned_by_user?(user)
  end

  def show?
    record.visible_to_user?(user)
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  class Scope < Scope
    def resolve
      scope.where(board: user.boards)
    end
  end
end
