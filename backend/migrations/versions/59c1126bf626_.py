"""empty message

Revision ID: 59c1126bf626
Revises: 
Create Date: 2023-11-16 17:13:43.947377

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '59c1126bf626'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('rut', sa.String(length=100), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('city', sa.String(length=100), nullable=True),
    sa.Column('country', sa.String(length=100), nullable=True),
    sa.Column('summary', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('rut')
    )
    op.create_table('framework',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('level', sa.String(length=100), nullable=True),
    sa.Column('user_rut', sa.String(length=12), nullable=True),
    sa.ForeignKeyConstraint(['user_rut'], ['user.rut'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hobby',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.Column('user_rut', sa.String(length=12), nullable=True),
    sa.ForeignKeyConstraint(['user_rut'], ['user.rut'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('hobby')
    op.drop_table('framework')
    op.drop_table('user')
    # ### end Alembic commands ###
