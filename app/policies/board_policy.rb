class BoardPolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def show?
    index?
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
    index?
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
