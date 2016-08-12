# -*- encoding: utf8 -*-
from BayesianNode import *

__author__ = 'Alex'

# Modelado de la Red
# Creamos los nodos correspondientes
#rain_bayesian_node = BayesianNode("rain")
#sprinkler_bayesian_node = BayesianNode("sprinkler")
#wet_grass_bayesian_node = BayesianNode("wet grass")
sex_bayesian_node = BayesianNode("sex")
fraud_bayesian_node = BayesianNode("fraud")
jewelry_bayesian_node = BayesianNode("jewelry")

# Establecemos el nodo independiente como raíz de nuestra red
#wet_grass_bayesian_network = rain_bayesian_node
jewelry_bayesian_network = sex_bayesian_node

# Diseñamos la Red agregando los hijos de cada nodo
#rain_bayesian_node.add(sprinkler_bayesian_node)
#rain_bayesian_node.add(wet_grass_bayesian_node)
#sprinkler_bayesian_node.add(wet_grass_bayesian_node)
sex_bayesian_node.add(fraud_bayesian_node)
sex_bayesian_node.add(jewelry_bayesian_node)
fraud_bayesian_node.add(jewelry_bayesian_node)

# Establecemos las tablas para cada nodo y sus valores probabilísticos
# Orden: Rain
#rain_bayesian_node.set_table({True: 0.2, False: 0.8})

# Orden Sex
sex_bayesian_node.set_table({True: 0.6, False: 0.4})

# Orden: Rain, Sprinkler
#sprinkler_bayesian_node.set_table({
#    True: {
#        True: 0.01,
#        False: 0.99},
#    False: {
#        True: 0.4,
#        False: 0.6}})
# Orden Sex, Fraud
fraud_bayesian_node.set_table({
    True: {
        True: 0.8,
        False: 0.2},
    False: {
        True: 0.3,
        False: 0.7}})

# Orden: Sprinkler, Rain, Grass Wet
#wet_grass_bayesian_node.set_table({
#    True: {
#        True: {
#            True: 0.99,
#            False: 0.01
#        },
#        False: {
#            True: 0.9,
#            False: 0.1
#        }
#    },
#    False: {
#        True: {
#            True: 0.8,
#            False: 0.2
#        },
#        False: {
#            True: 0.0,
#            False: 1.0
#        }
#    }
#})
# Orden: Fraud, Sex, Jewelry
jewelry_bayesian_node.set_table({
    True: {
        True: {
            True: 0.7,
            False: 0.3
        },
        False: {
            True: 0.1,
            False: 0.9
        }
    },
    False: {
        True: {
            True: 0.8,
            False: 0.2
        },
        False: {
            True: 0.9,
            False: 0.1
        }
    }
    })

# Idiom personal que me permite encontrar la probabilidad específica de una tabla dados ciertos valores
#print wet_grass_bayesian_network.p[True][False][False]

#print wet_grass_bayesian_node
#wet_grass_bayesian_node.p_sum({'var': wet_grass_bayesian_node.var, 'value': True})

# a dado b
#print wet_grass_bayesian_node.a_given_b(
    # Lista de diccionarios
#    [   {'var': wet_grass_bayesian_node.var, 'value': True}     ],
    # Lista de diccionarios
#    [   {'var': rain_bayesian_node.var, 'value':True}, {'var': sprinkler_bayesian_node.var,'value':True}    ])

#print wet_grass_bayesian_node.a_given_b(
    # Lista de diccionarios
#    [   {'var': rain_bayesian_node.var, 'value': False}, {'var': sprinkler_bayesian_node.var, 'value': False}     ],
    # Lista de diccionarios
#    [   {'var': wet_grass_bayesian_node.var, 'value': True}    ])
print "Primera Consulta"
print jewelry_bayesian_node.a_given_b(
    [{'var':fraud_bayesian_node.var, 'value': True}],
    [{'var':jewelry_bayesian_node.var,'value':True}])

print "Segunda Consulta"
print jewelry_bayesian_node.a_given_b(
    [{'var':fraud_bayesian_node.var, 'value':True}],
    [{'var':sex_bayesian_node.var,'value':False}, {'var':jewelry_bayesian_node.var,'value':True}])

print "Tercer Consulta"
print jewelry_bayesian_node.a_given_b(
    [{'var':fraud_bayesian_node.var, 'value': True}],
    [{'var':sex_bayesian_node.var,'value':True}, {'var':jewelry_bayesian_node.var,'value':False}])