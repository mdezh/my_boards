class BoardPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    record.belong_to_user?(user) || record.published?
  end

  def create?
    index?
  end

  def update?
    record.owned_by_user?(user)
  end

  def destroy?
    update?
  end

  def details?
    show?
  end

  def cancel_new?
    index?
  end

  class Scope < Scope
    def resolve
      user.boards
    end
  end
end
