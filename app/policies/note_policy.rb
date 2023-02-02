class NotePolicy < ApplicationPolicy
  # use board as record
  def index?
    record.nil? || record.belong_to_user?(user) || record.published?
  end

  # use board as record
  def create?
    record.owned_by_user?(user) || (record.public_rw? && record.joined_by_user?(user))
  end

  def show?
    user.id == record.board.owner_id || record.board.published?
  end

  def update?
    record.user_id == user.id
  end

  def destroy?
    update? || user.id == record.board.owner_id
  end
end
